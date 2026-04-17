import { supabase } from '../lib/supabase'

export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('책 목록 불러오기 실패:', error.message)
    return []
  }
  return data
}

export async function addBook({ title, author, category, is_millie }) {
  const { data, error } = await supabase
    .from('books')
    .insert([{ title, author, category, is_millie, is_done: false }])
    .select('id')

  if (error) {
    throw new Error(error.message)
  }
  if (!data || data.length === 0) {
    throw new Error('저장이 반영되지 않았어요. (권한/RLS 설정을 확인해 주세요)')
  }
}

export async function updateBook(id, updates) {
  const payload = {}
  if (Object.prototype.hasOwnProperty.call(updates, 'title')) payload.title = updates.title
  if (Object.prototype.hasOwnProperty.call(updates, 'author')) payload.author = updates.author
  if (Object.prototype.hasOwnProperty.call(updates, 'category')) payload.category = updates.category
  if (Object.prototype.hasOwnProperty.call(updates, 'is_millie')) payload.is_millie = updates.is_millie
  if (Object.prototype.hasOwnProperty.call(updates, 'is_done')) payload.is_done = updates.is_done

  const { data, error } = await supabase
    .from('books')
    .update(payload)
    .eq('id', id)
    .select('id')

  if (error) {
    throw new Error(error.message)
  }
  if (!data || data.length === 0) {
    throw new Error('수정이 반영되지 않았어요. (권한/RLS 설정을 확인해 주세요)')
  }
}

export async function deleteBook(id) {
  const { error } = await supabase.from('books').delete().eq('id', id)
  if (error) {
    console.error('책 삭제 실패:', error.message)
  }
}
