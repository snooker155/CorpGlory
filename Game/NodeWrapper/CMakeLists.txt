set(submodules)

foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

include_directories(/usr/include/nodejs/src inc ${ALL_INCLUDES})
add_library(NodeWrapper src/dummy.cpp inc/GameWrapper.hpp src/GameWrapper.cpp)

add_custom_command(
        TARGET NodeWrapper
        PRE_BUILD
        COMMAND node-gyp configure build
        WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR})