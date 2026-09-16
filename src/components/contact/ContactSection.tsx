import React, { useState } from 'react';
import { Mail, Copy, Check, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = personalInfo.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const accessKey =
      (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
      '51675230-0013-4870-b71d-5e336f80629b';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Meddelande från ${formData.name.trim()}`,
          from_name: `${formData.name.trim()} (Portfolio)`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#df5b37', '#f97316', '#3b82f6'],
          });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage(data.message || 'Could not send message. Please try again.');
      }
    } catch {
      setErrorMessage('Could not send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.6rem', color: '#111827' }}>
            Get in Touch
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Have a project in mind or looking for a passionate Frontend Developer? Let's talk.
          </p>
        </div>

        <div style={{ maxWidth: '950px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Direct Contacts */}
          <div
            style={{
              padding: '2.5rem',
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>
                Contact Information
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                I am currently open to full-time frontend developer roles, consulting, and exciting web projects.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(223, 91, 55, 0.1)', color: '#df5b37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Email</div>
                    <a href={`mailto:${email}`} style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>
                      {email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Location</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>Sweden</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleCopyEmail} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <div
            style={{
              padding: '2.5rem',
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(223, 91, 55, 0.1)', color: '#df5b37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <Sparkles size={30} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>
                  Message Sent!
                </h4>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-secondary btn-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {errorMessage && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.88rem' }}>
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Lindqvist"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
