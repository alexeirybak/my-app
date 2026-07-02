import { Suspense } from 'react'
import { TodoList } from './components/TodoList'
import { CommentsList } from './components/CommentsList'
import { UserProfile } from './components/UserProfile'
import { TodoCard } from './components/TodoCard'
import { ParallelQueries } from './components/ParallelQueries'

function App() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1>TanStack Query - Полный урок</h1>
      
      <section style={{ marginBottom: '3rem', borderBottom: '2px solid #eee', paddingBottom: '2rem' }}>
        <h2>1. Базовый запрос (TodoList)</h2>
        <TodoList />
      </section>

      <section style={{ marginBottom: '3rem', borderBottom: '2px solid #eee', paddingBottom: '2rem' }}>
        <h2>2. Динамический ключ (Comments)</h2>
        <CommentsList />
      </section>

      <section style={{ marginBottom: '3rem', borderBottom: '2px solid #eee', paddingBottom: '2rem' }}>
        <h2>3. Зависимые запросы (UserProfile)</h2>
        <UserProfile />
      </section>

      <section style={{ marginBottom: '3rem', borderBottom: '2px solid #eee', paddingBottom: '2rem' }}>
        <h2>4. Suspense (TodoCard)</h2>
        <Suspense fallback={<p>Загрузка карточки...</p>}>
          <TodoCard />
        </Suspense>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>5. Параллельные запросы</h2>
        <ParallelQueries />
      </section>
    </div>
  )
}

export default App