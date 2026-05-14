'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/gradient-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, File, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ModelUploadPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    version: '1.0.0',
    price: '',
    file: null as File | null,
  })
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024 * 1024) {
        toast.error('File size must be less than 5GB')
        return
      }
      setFormData(prev => ({ ...prev, file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.file) {
      toast.error('Please fill in all required fields')
      return
    }

    setUploading(true)
    try {
      // Simulate file upload
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      toast.success('Model uploaded successfully!')
      setFormData({
        name: '',
        description: '',
        category: '',
        version: '1.0.0',
        price: '',
        file: null,
      })
      setUploadProgress(0)

      // Redirect to creator dashboard
      setTimeout(() => {
        window.location.href = '/creator'
      }, 1500)
    } catch (error) {
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Upload AI <GradientText>Model</GradientText>
        </h1>
        <p className="text-muted-foreground">
          Share your AI model with the world and start earning
        </p>
      </motion.div>

      {/* Upload Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl border border-border/50 p-8 max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Model Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Model Name <span className="text-red-500">*</span>
            </label>
            <Input
              name="name"
              placeholder="e.g., GPT-Vision Clone"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Make it descriptive and memorable
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="description"
              placeholder="Describe your model, its capabilities, and use cases..."
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </div>

          {/* Category & Version */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border/50 bg-background px-3 py-2"
              >
                <option value="">Select a category</option>
                <option value="nlp">Natural Language Processing</option>
                <option value="vision">Computer Vision</option>
                <option value="audio">Audio/Speech</option>
                <option value="timeseries">Time Series</option>
                <option value="embeddings">Embeddings</option>
                <option value="generation">Image Generation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Version</label>
              <Input
                name="version"
                placeholder="1.0.0"
                value={formData.version}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Price Per API Call (ETH) <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              name="price"
              placeholder="0.05"
              step="0.001"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Users will pay this amount for each inference
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Model File <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
                accept=".pt,.pb,.h5,.onnx,.zip"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                {formData.file ? (
                  <div className="flex flex-col items-center gap-2">
                    <File className="w-8 h-8 text-primary" />
                    <p className="font-medium text-sm">{formData.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="font-medium text-sm">
                      Drop your model file here or click to select
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported: PyTorch, TensorFlow, ONNX (max 5GB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && uploadProgress > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={uploading}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {uploading ? 'Uploading...' : 'Upload Model'}
          </Button>
        </form>
      </motion.div>

      {/* Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-border/50 p-6 max-w-2xl"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          Upload Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Model files should be well-tested and production-ready</li>
          <li>✓ Include clear documentation for users</li>
          <li>✓ Ensure your model passes our security scan</li>
          <li>✓ Set competitive pricing for better sales</li>
          <li>✓ Update your model regularly with improvements</li>
          <li>✓ Respond to user reviews and feedback</li>
        </ul>
      </motion.div>

      {/* Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl border border-border/50 p-6 max-w-2xl bg-amber-500/5 border-amber-500/20"
      >
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              Check our{' '}
              <a href="#" className="text-amber-500 hover:underline">
                creator guide
              </a>
              {' '}or email{' '}
              <a href="mailto:support@nexusai.com" className="text-amber-500 hover:underline">
                support@nexusai.com
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
