import { useState, useEffect, useCallback } from 'react'
import CategorySidebar from './components/CategorySidebar'
import BookList from './components/BookList'
import AddBookModal from './components/AddBookModal'
import FloatingButton from './components/FloatingButton'
import { getBooks, addBook, updateBook, deleteBook } from './services/bookService'
import './App.css'

export const CATEGORIES = [
  { id: 'all', label: '전체보기' },
  { id: '자기개발', label: '자기개발' },
  { id: '국내소설', label: '국내소설' },
  { id: '외국소설', label: '외국소설' },
  { id: '에세이', label: '에세이' },
  { id: '경제', label: '경제' },
  { id: '인문', label: '인문' },
  { id: '심리', label: '심리' },
  { id: '고전', label: '고전' },
  { id: 'millie', label: '밀리의 서재' },
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    const data = await getBooks()
    setBooks(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  useEffect(() => {
    if (!statusMessage) return undefined
    const id = window.setTimeout(() => setStatusMessage(''), 2500)
    return () => window.clearTimeout(id)
  }, [statusMessage])

  const filteredBooks =
    selectedCategory === 'all'
      ? books
      : selectedCategory === 'millie'
        ? books.filter((b) => b.is_millie)
        : books.filter((b) => b.category === selectedCategory)

  const handleSaveBook = async (bookData) => {
    try {
      if (editingBook?.id) {
        await updateBook(editingBook.id, bookData)
        setEditingBook(null)
        setStatusMessage('책을 수정했어요.')
      } else {
        await addBook(bookData)
        setStatusMessage('책을 추가했어요.')
      }
      await fetchBooks()
      setIsModalOpen(false)
      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : '저장에 실패했어요.'
      setStatusMessage(`저장 실패: ${message}`)
      return false
    }
  }

  const handleDeleteBook = async (id) => {
    await deleteBook(id)
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  const countsByCategory = books.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1
    return acc
  }, {})

  const millieCount = books.reduce((n, b) => n + (b.is_millie ? 1 : 0), 0)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="header-icon">📚</span>
          <h1 className="header-title">Book Wish</h1>
        </div>
      </header>

      {statusMessage ? (
        <div
          style={{
            position: 'sticky',
            top: 60,
            zIndex: 120,
            margin: '10px 12px 0',
            padding: '10px 12px',
            borderRadius: 14,
            background: 'rgba(31,31,31,0.92)',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 700,
          }}
          onClick={() => setStatusMessage('')}
          role="status"
        >
          {statusMessage}
        </div>
      ) : null}

      <main className="app-main">
        <CategorySidebar
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          counts={countsByCategory}
          total={books.length}
          millieCount={millieCount}
        />
        <section className="book-section">
          <BookList
            books={filteredBooks}
            loading={loading}
            onDelete={handleDeleteBook}
            onEdit={(book) => {
              setEditingBook(book)
              setIsModalOpen(true)
            }}
          />
        </section>
      </main>

      <FloatingButton
        onClick={() => {
          setEditingBook(null)
          setIsModalOpen(true)
        }}
      />

      {isModalOpen && (
        <AddBookModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveBook}
          initialBook={editingBook}
        />
      )}
    </div>
  )
}

export default App
