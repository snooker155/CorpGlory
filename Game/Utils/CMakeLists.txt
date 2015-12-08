set(submodules)

foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

set(SOURCE_FILES inc/Random.hpp src/Random.cpp inc/ProducerConsumerQueue.hpp)
add_library(Utils ${SOURCE_FILES})