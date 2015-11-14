set(submodules)
foreach(module ${submodules})
    add_subdirectory(${module})
endforeach()

SET(SOURCE_FILES inc/Model.hpp
                 inc/WorldModel.hpp inc/UserModel.hpp
                 src/UserModel.cpp src/WorldModel.cpp
                 src/CompanyModel.cpp inc/CompanyModel.hpp
                 src/WorldUsersModel.cpp inc/WorldUsersModel.hpp
                 src/TeamModel.cpp inc/TeamModel.hpp)

add_library(Models ${SOURCE_FILES})