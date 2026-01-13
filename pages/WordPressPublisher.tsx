import React, { useState, useEffect } from 'react';
import { WordPressPublisher, PublishResult, PublisherConfig } from '../services/wordpressPublisher';
import { PostInput, EditorialCalendar, BrandGuidelines } from '../utils/validationUtils';

interface WordPressPublisherPageProps {
  config: PublisherConfig;
}

const WordPressPublisherPage: React.FC<WordPressPublisherPageProps> = ({ config }) => {
  const [publisher] = useState(() => new WordPressPublisher(config));
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  
  const [formData, setFormData] = useState<PostInput>({
    theme: '',
    mainKeyword: '',
    content: '',
    publishDate: '',
    category: '',
    cta: '',
  });

  const [preview, setPreview] = useState<any>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const connected = await publisher.verifyConnection();
    setIsConnected(connected);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreview = async () => {
    setIsPreviewMode(true);
    const previewData = await publisher.previewPost(formData);
    setPreview(previewData);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishResult(null);

    try {
      const result = await publisher.publishPost(formData);
      setPublishResult(result);

      if (result.success) {
        // Clear form on success
        setFormData({
          theme: '',
          mainKeyword: '',
          content: '',
          publishDate: '',
          category: '',
          cta: '',
        });
        setPreview(null);
        setIsPreviewMode(false);
      }
    } catch (error) {
      setPublishResult({
        success: false,
        message: 'Erro ao publicar',
        errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  return (
    <div className="wordpress-publisher-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📝 Publicador Automático WordPress
        </h1>
        <p style={{ color: '#64748b' }}>
          Sistema de publicação automatizada com SEO e calendário editorial
        </p>
        
        {isConnected !== null && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            borderRadius: '8px',
            background: isConnected ? '#d1fae5' : '#fee2e2',
            color: isConnected ? '#065f46' : '#991b1b',
          }}>
            {isConnected ? '✓ Conectado ao WordPress' : '✗ Erro de conexão com WordPress'}
          </div>
        )}
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Form Section */}
        <div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Dados do Post
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Tema *
                </label>
                <input
                  type="text"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  placeholder="Ex: Benefícios da Criomodelagem"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Palavra-chave Principal *
                </label>
                <input
                  type="text"
                  name="mainKeyword"
                  value={formData.mainKeyword}
                  onChange={handleInputChange}
                  placeholder="Ex: criomodelagem"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Texto do Post *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Cole o conteúdo do post aqui... (suporta ## para H2, ### para H3, * para listas)"
                  rows={12}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Data de Publicação *
                </label>
                <input
                  type="datetime-local"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Categoria (opcional)
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Ex: Estética Corporal"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  CTA Personalizado (opcional)
                </label>
                <textarea
                  name="cta"
                  value={formData.cta}
                  onChange={handleInputChange}
                  placeholder="Deixe em branco para usar CTA padrão"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handlePreview}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  👁️ Pré-visualizar
                </button>

                <button
                  onClick={handlePublish}
                  disabled={isPublishing || !isConnected}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: isPublishing || !isConnected ? '#94a3b8' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: isPublishing || !isConnected ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isPublishing ? '⏳ Publicando...' : '🚀 Publicar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview/Result Section */}
        <div>
          {publishResult && (
            <div style={{
              background: publishResult.success ? '#d1fae5' : '#fee2e2',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1rem',
            }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {publishResult.success ? '✓ Sucesso!' : '✗ Erro'}
              </h3>
              <p>{publishResult.message}</p>
              
              {publishResult.postUrl && (
                <a
                  href={publishResult.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0ea5e9', textDecoration: 'underline' }}
                >
                  Ver post publicado →
                </a>
              )}

              {publishResult.errors && publishResult.errors.length > 0 && (
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  {publishResult.errors.map((error, i) => (
                    <li key={i} style={{ color: '#991b1b' }}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {preview && (
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Pré-visualização
              </h2>

              {/* SEO Score */}
              <div style={{
                background: '#f8fafc',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>SEO Score:</span>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    background: getSeoScoreColor(preview.seoScore),
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                    {preview.seoScore}/100
                  </div>
                </div>
                {preview.seoFeedback && preview.seoFeedback.length > 0 && (
                  <ul style={{ fontSize: '0.875rem', color: '#64748b', paddingLeft: '1.5rem' }}>
                    {preview.seoFeedback.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Validation Errors */}
              {preview.validationErrors && preview.validationErrors.length > 0 && (
                <div style={{
                  background: '#fee2e2',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                }}>
                  <strong style={{ color: '#991b1b' }}>Erros de Validação:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#991b1b' }}>
                    {preview.validationErrors.map((error: string, i: number) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preview Content */}
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Título:</strong>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                    {preview.title}
                  </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <strong>Slug:</strong>
                  <p style={{ color: '#0ea5e9', fontFamily: 'monospace', margin: '0.5rem 0' }}>
                    /{preview.slug}
                  </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <strong>Resumo:</strong>
                  <p style={{ color: '#64748b', margin: '0.5rem 0' }}>
                    {preview.excerpt}
                  </p>
                </div>

                <div>
                  <strong>Conteúdo:</strong>
                  <div
                    style={{
                      marginTop: '0.5rem',
                      padding: '1rem',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      maxHeight: '400px',
                      overflow: 'auto',
                    }}
                    dangerouslySetInnerHTML={{ __html: preview.content }}
                  />
                </div>
              </div>
            </div>
          )}

          {!preview && !publishResult && (
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center',
              color: '#94a3b8',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <p>Preencha os campos e clique em "Pré-visualizar"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordPressPublisherPage;
