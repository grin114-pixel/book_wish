import './FloatingButton.css'

function FloatingButton({ onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="책 추가">
      <span className="fab-icon">+</span>
    </button>
  )
}

export default FloatingButton
