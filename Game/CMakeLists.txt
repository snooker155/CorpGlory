set(submodules Actions Models GameElements NodeWrapper Utils)

MACRO(HEADER_DIRECTORIES return_list)
    FILE(GLOB_RECURSE new_list *.hpp)
    SET(dir_list "")
    FOREACH(file_path ${new_list})
        GET_FILENAME_COMPONENT(dir_path ${file_path} DIRECTORY)
        SET(dir_list ${dir_list} ${dir_path})
    ENDFOREACH()
    LIST(REMOVE_DUPLICATES dir_list)
    SET(AFILES ${dir_list} CACHE STRING filsers)
    SET(${return_list} ${dir_list})
ENDMACRO()

header_directories(ALL_INCLUDES)
include_directories(${ALL_INCLUDES})

foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

add_library(Game src/Game.cpp inc/Game.hpp src/Player.cpp inc/Player.hpp)
target_link_libraries(Game GameElements Models Utils)

add_executable(Main src/Main.cpp)
target_link_libraries(Main Game)