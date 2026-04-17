import { useState } from 'react'
import './BookCard.css'

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m5 16.75 9.8-9.8a1.8 1.8 0 0 1 2.55 0l.7.7a1.8 1.8 0 0 1 0 2.55L8.25 20H5v-3.25Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.5 7.5h13M9.5 4.75h5l.75 2.75m-8 0 .55 9.2A2 2 0 0 0 9.8 18.6h4.4a2 2 0 0 0 1.99-1.9l.56-9.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

const CATEGORY_COLORS = {
  자기개발: { bg: '#ccfbf1', text: '#0f766e', dot: '#14b8a6' },
  국내소설: { bg: '#e8f5e9', text: '#2e7d32', dot: '#43a047' },
  외국소설: { bg: '#e3f2fd', text: '#1565c0', dot: '#42a5f5' },
  에세이: { bg: '#fff8e1', text: '#f57f17', dot: '#ffca28' },
  경제: { bg: '#fce7f3', text: '#be185d', dot: '#ec4899' },
  인문: { bg: '#fffbeb', text: '#b45309', dot: '#f59e0b' },
  심리: { bg: '#ede9fe', text: '#5b21b6', dot: '#a78bfa' },
  고전: { bg: '#fbe9e7', text: '#bf360c', dot: '#ff7043' },
}

function BookCard({ book, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const color = CATEGORY_COLORS[book.category] || { bg: '#f5f5f5', text: '#555', dot: '#aaa' }

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(book.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  return (
    <div className="book-card" style={{ '--card-accent': color.dot }}>
      <div className="book-card-body">
        <h3 className="book-title">
          {book.is_millie && (
            <img className="millie-title-logo" src="/millie.png" alt="밀리의 서재" />
          )}
          {book.title}
        </h3>
        <div className="book-meta-row">
          <p className="book-author">{book.author || '\u00A0'}</p>
          <div className="card-actions-inline">
            <button
              className="icon-button"
              onClick={() => onEdit?.(book)}
              title="수정"
              aria-label="수정"
              type="button"
            >
              <EditIcon />
            </button>
            <button
              className={`icon-button ${confirmDelete ? 'confirm' : ''}`}
              onClick={handleDelete}
              title={confirmDelete ? '한번 더 누르면 삭제됩니다' : '삭제'}
              aria-label="삭제"
              type="button"
            >
              {confirmDelete ? '삭제?' : <DeleteIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
