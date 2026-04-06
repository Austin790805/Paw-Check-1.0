import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle2, Loader2, Camera } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

export default function HealthCheck() {
  const [petType, setPetType] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image || !petType || !symptoms) {
      setError('Please provide pet type, symptoms, and an image.');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Extract base64 data and mime type
      const base64Data = image.split(',')[1];
      const mimeMatch = image.match(/^data:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

      const prompt = `You are a veterinary AI assistant. I have a ${petType}. 
      The common signs and symptoms are: ${symptoms}.
      Analyze the provided image and symptoms.
      Provide a preliminary assessment.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: {
          parts: [
            { text: prompt },
            { inlineData: { data: base64Data, mimeType } }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: {
                type: Type.STRING,
                description: "Either 'healthy', 'warning', or 'critical'"
              },
              condition: {
                type: Type.STRING,
                description: "The probable condition"
              },
              confidence: {
                type: Type.NUMBER,
                description: "A number between 0 and 100 representing confidence"
              },
              recommendation: {
                type: Type.STRING,
                description: "Detailed suggested next steps"
              },
              urgency: {
                type: Type.STRING,
                description: "Urgency level (e.g., 'Low', 'Medium', 'High')"
              }
            },
            required: ["status", "condition", "confidence", "recommendation", "urgency"]
          }
        }
      });

      const responseText = response.text || '';
      const jsonStr = responseText.replace(/```json\n?|```/g, '').trim();
      
      if (!jsonStr) {
        throw new Error("Empty response from AI");
      }
      
      const parsedResult = JSON.parse(jsonStr);
      setResult(parsedResult);
    } catch (err: any) {
      console.error(err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setResult(null);
    setPetType('');
    setSymptoms('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">AI Health Assessment</h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
          Provide details and upload a photo for a preliminary AI analysis.
        </p>
        <div className="mt-4 inline-flex items-center p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-lg text-sm">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p>This tool provides preliminary insights and is <strong>not a substitute for professional veterinary advice.</strong></p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 sm:p-10">
          {!result ? (
            <div className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type of Pet</label>
                  <input
                    type="text"
                    placeholder="e.g., Dog, Cat, Rabbit"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Common Signs & Symptoms</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you've noticed..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>

              {!image ? (
                <div 
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                  <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-500 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Click to upload photo</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">PNG, JPG up to 5MB</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex justify-center max-h-96">
                  <img src={image} alt="Uploaded pet" className="object-contain max-h-96" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 shadow-sm"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing || !image || !petType || !symptoms}
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Analyzing...
                    </>
                  ) : (
                    'Generate Assessment'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    Analysis Result
                    {result.status === 'healthy' && <CheckCircle2 className="ml-2 w-6 h-6 text-green-500" />}
                    {result.status === 'warning' && <AlertCircle className="ml-2 w-6 h-6 text-amber-500" />}
                    {result.status === 'critical' && <AlertCircle className="ml-2 w-6 h-6 text-red-500" />}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Confidence: {result.confidence}%</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.status === 'healthy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  result.status === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {result.condition}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Suggested Next Steps</h4>
                  <p className="text-slate-700 dark:text-slate-300">{result.recommendation}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Urgency</h4>
                  <p className="text-slate-700 dark:text-slate-300">{result.urgency}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={resetAnalysis}
                  className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  New Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
