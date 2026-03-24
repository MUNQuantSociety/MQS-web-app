'use client'

import Image from "next/image"
import {useRef, useState} from "react"
import './styles.css'
import { myResources } from './index'

const Resources = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeResourceId, setActiveResourceId] = useState<number | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<Record<number, string>>({})

  const handleUploadClick = (resourceId: number) => {
    setActiveResourceId(resourceId)
    fileInputRef.current?.click()
  } 

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (file && activeResourceId !== null) {
    setSelectedFiles((previous) => ({
      ...previous,
      [activeResourceId]: file.name,
    }));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/resources/upload/', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      const data = await response.json();
      console.log('Upload successful, file URL:', data.url);
    } catch (error) {
      console.error('File upload error:', error);
    }
  }
  event.target.value = '';
};

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
           <h1 className="text-5xl font-bold mb-6">Team Resources</h1>
           <div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore our teams and access shared resources. 
              Each team has dedicated folders containing project documentation, 
              research papers, code repositories, and meeting notes.
            </p>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mt-4">
              New members should start by exploring the team drives. Each folder contains an onboarding document, past project examples, and useful resources.
              Feel free to reach out to team leads if you have any questions!
            </p>
           </div>
        </div>

        <div className="card-container">
          {myResources.map((resource) => (
            <div key={resource.id} className="card">
              <div className="card-header">
                {resource.image && (
                  <Image src={resource.image} alt={resource.title} className="card-image" />
                )}
                <h3 className="card-title">{resource.title}</h3>
              </div>
              
              <div className="card-content">
                <p className="card-description">{resource.description}</p>
                
                <div className="card-tags">
                  {resource.tags && resource.tags.map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {resource.href && (
                <div className="card-footer text-center">
                  <a href={resource.href} className="card-link">
                    Access Team Drive
                    <Image 
                      src="/external-link.png" 
                      alt="External link" 
                      width={16}            
                      height={16} 
                      className="ml-2 filter invert"
                    />
                  </a>

                  <button
                    type= "button"
                    className="upload-button"
                    onClick={() => handleUploadClick(resource.id)}
                  >
                    Upload File
                  </button>

                  {selectedFiles[resource.id] && (
                    <p className="selected-file-name">{selectedFiles[resource.id]}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}

export default Resources
