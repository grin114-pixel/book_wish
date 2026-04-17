import BookCard from './BookCard'
import './BookList.css'

function BookList({ books, loading, onDelete, onEdit, onToggleDone }) {
  if (loading) {
    return (
      <div className="booklist-state">
        <div className="loading-spinner" />
        <p>책 목록을 불러오는 중...</p>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="booklist-state">
        <span className="empty-icon">📭</span>
        <p className="empty-title">아직 담은 책이 없어요</p>
        <p className="empty-sub">아래 + 버튼을 눌러 첫 번째 책을 추가해보세요!</p>
      </div>
    )
  }

  return (
    <div className="booklist-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleDone={onToggleDone}
        />
      ))}
    </div>
  )
}

export default BookList
