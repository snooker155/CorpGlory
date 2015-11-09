//
// Created by ees on 11/8/15.
//

#ifndef CORPGLORYGAME_RANDOM_HPP
#define CORPGLORYGAME_RANDOM_HPP

#include <stddef.h>
#include <vector>
#include <limits>
#include <stdint.h>
#include <random>

namespace Random
{
  struct NormalParameters
  {
    double mean;
    double stddev;
  };

  template <class T>
  struct UniformParameters
  {
    T left;
    T right;
  };

  std::mt19937_64 gen();

  double normal(NormalParameters&& params = {0, 1});
  std::vector<double> normal(size_t n, NormalParameters&& params = {0, 1});
  std::vector<std::vector<double>> normal(size_t w, size_t h, NormalParameters&& params = {0, 1});

  int poisson(double lambda);
  std::vector<int> poisson(size_t n, double lambda);
  std::vector<std::vector<int>> poisson(size_t w, size_t h, double lambda);

  template <class T>
  T uniform(UniformParameters<T>&& params = {T(0), std::numeric_limits<T>::max()});

  template <class T>
  std::vector<T> uniform(size_t n, UniformParameters<T>&& params = {T(0), std::numeric_limits<T>::max()});

  template <class T>
  std::vector<std::vector<T>> uniform(size_t w, size_t h, UniformParameters<T>&& params = {T(0), std::numeric_limits<T>::max()});

  template <class It>
  It choice(It begin, It end)
  {
    int dist = static_cast<int>(std::distance(begin, end));
    int index = uniform<int>({0, dist - 1});
    return (begin + index);
  }
};


#endif //CORPGLORYGAME_RANDOM_HPP
