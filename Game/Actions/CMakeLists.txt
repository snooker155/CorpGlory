set(submodules)
foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

SET(SOURCE_FILES inc/Action.hpp src/Action.cpp inc/TeamActions.hpp src/TeamActions.cpp)
add_library(Actions ${SOURCE_FILES})
