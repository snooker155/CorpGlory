set(submodules)

foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

include_directories(/usr/include/nodejs/src SYSTEM)
add_library(NodeWrapper src/GameWrapper.cpp src/GameModule.cpp)

add_custom_command(
        TARGET NodeWrapper
        PRE_BUILD
        COMMAND node-gyp configure build
        WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR})