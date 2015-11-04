set(submodules)
foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

include_directories(inc)
SET(SOURCE_FILES ${SOURCE_FILES})