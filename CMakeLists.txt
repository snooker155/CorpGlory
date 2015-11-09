cmake_minimum_required(VERSION 3.0)
project(CorpGloryGame)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -pthread")

include_directories(${INCLUDE_DIRECTORIES})
add_subdirectory(Game)