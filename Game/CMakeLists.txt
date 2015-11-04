set(submodules Actions Controllers Models GameElements NodeWrapper Utils)

foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

set(INCLUDE_DIRECTORIES inc)

MACRO(HEADER_DIRECTORIES return_list)
    FILE(GLOB_RECURSE new_list *.hpp)
    SET(dir_list "")
    FOREACH(file_path ${new_list})
        GET_FILENAME_COMPONENT(dir_path ${file_path} PATH)
        SET(dir_list ${dir_list} ${dir_path})
    ENDFOREACH()
    LIST(REMOVE_DUPLICATES dir_list)
    SET(${return_list} ${dir_list} CACHE STRING foo)
ENDMACRO()

header_directories(ALL_INCLUDES)
include_directories(${ALL_INCLUDES})

add_library(Game src/Game.cpp inc/Game.hpp)
add_executable(Main main.cpp)
target_link_libraries(Main Game)