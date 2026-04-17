import { useState, useEffect, useRef } from 'react'
import './AddBookModal.css'

const CATEGORIES = ['자기개발', '국내소설', '외국소설', '에세이', '경제', '인문', '심리', '고전']

function AddBookModal({ onClose, onSubmit, initialBook }) {
  const isEdit = Boolean(initialBook?.id)
  const [title, setTitle] = useState(initialBook?.title ?? '')
  const [author, setAuthor] = useState(initialBook?.author ?? '')
  const [category, setCategory] = useState(initialBook?.category ?? '')
  const [isMillie, setIsMillie] = useState(initialBook?.is_millie ?? false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = '책 제목을 입력해주세요'
    if (!category) e.category = '카테고리를 선택해주세요'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    const ok = await onSubmit({
      title: title.trim(),
      author: author.trim() || null,
      category,
      is_millie: isMillie,
    })
    if (ok) {
      onClose()
      return
    }
    setSubmitting(false)
  }

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-box" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? '✏️ 책 수정하기' : '📚 책 추가하기'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          {/* 책 제목 */}
          <div className={`field ${errors.title ? 'field-error' : ''}`}>
            <label className="field-label" htmlFor="book-title">
              책 제목 <span className="required">*</span>
            </label>
            <input
              ref={titleRef}
              id="book-title"
              className="field-input"
              type="text"
              placeholder="읽고 싶은 책 제목을 입력하세요"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setErrors((prev) => ({ ...prev, title: '' }))
              }}
            />
            {errors.title && <p className="field-error-msg">{errors.title}</p>}
          </div>

          <div className="row-two">
            {/* 작가 */}
            <div className="field">
              <label className="field-label" htmlFor="book-author">
                작가 <span className="optional">(선택)</span>
              </label>
              <input
                id="book-author"
                className="field-input"
                type="text"
                placeholder="작가 이름"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* 밀리의 서재 */}
            <div className="field">
              <label className="field-label">
                밀리 <span className="optional">(선택)</span>
              </label>
              <label className="millie-label millie-compact">
                <input
                  type="checkbox"
                  className="millie-checkbox"
                  checked={isMillie}
                  onChange={(e) => setIsMillie(e.target.checked)}
                  aria-label="밀리의 서재 체크"
                />
                <img className="millie-logo" src="/millie.png" alt="밀리의 서재" />
              </label>
            </div>
          </div>

          {/* 카테고리 */}
          <div className={`field ${errors.category ? 'field-error' : ''}`}>
            <label className="field-label">
              카테고리 <span className="required">*</span>
            </label>
            <div className="category-chips">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`chip ${category === cat ? 'chip-active' : ''}`}
                  onClick={() => {
                    setCategory(cat)
                    setErrors((prev) => ({ ...prev, category: '' }))
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && <p className="field-error-msg">{errors.category}</p>}
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? (isEdit ? '수정 중...' : '추가 중...') : (isEdit ? '수정 완료' : '위시리스트에 추가')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookModal
