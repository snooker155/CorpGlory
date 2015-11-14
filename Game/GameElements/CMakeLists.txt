set(submodules)
foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

SET(SOURCE_FILES inc/GameElement.hpp src/GameElement.cpp
                 inc/World.hpp src/World.cpp
                 inc/Company.hpp src/Company.cpp
                 inc/User.hpp src/User.cpp
                 inc/WorldUsers.hpp src/WorldUsers.cpp
                 inc/Team.hpp src/Team.cpp)
add_library(GameElements ${SOURCE_FILES})