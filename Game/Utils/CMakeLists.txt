set(submodules)

foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

set(INCLUDE_DIRECTORIES inc)

include_directories(${INCLUDE_DIRECTORIES})

#add_library(Utils src/Game.cpp inc/Game.hpp)
#add_executable(Main main.cpp)
#target_link_libraries(Main Game)