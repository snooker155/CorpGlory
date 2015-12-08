//
// Created by ees on 11/8/15.
//

#include "Random.hpp"
#include <algorithm>

namespace Random
{

  std::random_device rd;
  std::mt19937_64 mt {rd()};

// TODO USE RANGES

  template <class T, class F>
  std::vector<T> generate(size_t n, F func)
  {
    std::vector<T> result(n);
    std::generate(result.begin(), result.end(), func);
    return result;
  }

  template <class T, class F>
  std::vector<std::vector<T>> generate(size_t w, size_t h, F func)
  {
    std::vector<std::vector<T>> result(h);
    std::generate(result.begin(), result.end(), [&]() { return generate<T>(w, func); });
    return result;
  };

  double normal(NormalParameters&& params)
  {
    return std::normal_distribution<double>(params.mean, params.stddev)(mt);
  }

  std::vector<double> normal(size_t n, NormalParameters&& params)
  {
    return generate<double>(n, [&]() { return normal(std::forward<NormalParameters>(params)); });
  }

  std::vector<std::vector<double>> normal(size_t w, size_t h, NormalParameters&& params)
  {
    return generate<double>(w, h, [&]() { return normal(std::forward<NormalParameters>(params)); });
  }

  template <>
  int uniform(UniformParameters<int>&& params)
  {
    return std::uniform_int_distribution<int>(params.left, params.right)(mt);
  }

  template <>
  std::vector<int> uniform(size_t n, UniformParameters<int>&& params)
  {
    return generate<int>(n, [&]() { return uniform<int>(std::forward<UniformParameters<int>>(params)); });
  }

  template <>
  std::vector<std::vector<int>> uniform(size_t w, size_t h, UniformParameters<int>&& params)
  {
    return generate<int>(w, h, [&]() { return uniform<int>(std::forward<UniformParameters<int>>(params)); });
  }

  template <>
  double uniform(UniformParameters<double>&& params)
  {
    return std::uniform_real_distribution<double>(params.left, params.right)(mt);
  }

  template <>
  std::vector<double> uniform(size_t n, UniformParameters<double>&& params)
  {
    return generate<double>(n, [&]() { return uniform<double>(std::forward<UniformParameters<double>>(params)); });
  }

  template <>
  std::vector<std::vector<double>> uniform(size_t w, size_t h, UniformParameters<double>&& params)
  {
    return generate<double>(w, h, [&]() { return uniform<double>(std::forward<UniformParameters<double>>(params)); });
  }

  int poisson(double lambda)
  {
    return std::poisson_distribution<>(lambda)(mt);
  }

  std::vector<int> poisson(size_t n, double lambda)
  {
    return generate<int>(n, [&]() { return poisson(lambda); });
  }

  std::vector<std::vector<int>> poisson(size_t w, size_t h, double lambda)
  {
    return generate<int>(w, h, [&]() { return poisson(lambda); });
  }

  std::mt19937_64 gen()
  {
    return mt;
  }

} // namespace Random