//
// Created by ees on 11/13/15.
//

#ifndef CORPGLORYGAME_PRODUCERCONSUMERQUEUE_HPP
#define CORPGLORYGAME_PRODUCERCONSUMERQUEUE_HPP

#include <queue>
#include <condition_variable>
#include <mutex>

template <class T>
class ProducerConsumerQueue
{
public:
  void push(T item)
  {
    std::unique_lock<std::mutex> lock(m_mutex);
    m_queue.push(item);
    m_condvar.notify_all();
  }

  T pop()
  {
    std::unique_lock<std::mutex> lock(m_mutex);
    m_condvar.wait(lock, [&](){return !m_queue.empty();});
    T value = m_queue.front();
    m_queue.pop();
    return value;
  }

  size_t size() const
  {
    std::unique_lock<std::mutex> lock(m_mutex);
    return m_queue.size();
  }

  bool empty() const
  {
    return size() == 0;
  }

private:
  std::queue<T> m_queue;
  mutable std::mutex m_mutex;
  std::condition_variable m_condvar;
};


#endif //CORPGLORYGAME_PRODUCERCONSUMERQUEUE_HPP
