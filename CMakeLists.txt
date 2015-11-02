cmake_minimum_required(VERSION 3.0)
project(CorpGloryGame)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

set(INCLUDE_DIRECTORIES /usr/include/nodejs/src)

add_subdirectory(game)

include_directories(${INCLUDE_DIRECTORIES})

set(SOURCE_FILES game/main.cpp)
add_executable(CorpGloryGame ${SOURCE_FILES})

add_custom_target(node-module
  COMMAND node-gyp configure build
        WORKING_DIRECTORY ${PROJECT_SOURCE_DIR}
)