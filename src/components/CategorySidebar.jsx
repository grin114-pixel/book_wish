import './CategorySidebar.css'

const CATEGORY_TEXT_COLORS = {
  자기개발: '#0f766e',
  국내소설: '#2e7d32',
  외국소설: '#1565c0',
  에세이: '#f57f17',
  경제: '#be185d',
  인문: '#b45309',
  심리: '#5b21b6',
  고전: '#bf360c',
}

function CategorySidebar({ categories, selected, onSelect, counts, total, millieCount }) {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        {categories.map((cat) => {
          const count =
            cat.id === 'all'
              ? total
              : cat.id === 'millie'
                ? millieCount || 0
                : counts[cat.id] || 0
          const isActive = selected === cat.id
          const labelColor = CATEGORY_TEXT_COLORS[cat.id]
          return (
            <li key={cat.id}>
              <button
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelect(cat.id)}
              >
                {cat.id === 'millie' ? (
                  <span className="sidebar-icon">
                    <img className="sidebar-millie-logo" src="/millie.png" alt="" />
                  </span>
                ) : null}
                <span
                  className="sidebar-label"
                  style={!isActive && labelColor ? { color: labelColor } : undefined}
                >
                  {cat.label}
                </span>
                {count > 0 && (
                  <span className="sidebar-badge">{count}</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default CategorySidebar
