{
  "targets": [
    {
      "target_name": "GameWrapper",
      "sources": [
        "src/GameWrapper.cpp",
        "src/GameModule.cpp",
        "../src/Player.cpp",
        "../src/Game.cpp",
        "../GameElements/src/Company.cpp",
        "../GameElements/src/User.cpp",
        "../GameElements/src/World.cpp",
        "../GameElements/src/WorldUsers.cpp",
        "../Models/src/CompanyModel.cpp",
        "../Models/src/UserModel.cpp",
        "../Models/src/WorldModel.cpp",
        "../Models/src/WorldUsersModel.cpp",
        "../Actions/src/Action.cpp",
        "../Utils/src/Random.cpp",
        "../GameElements/inc/GameElement.hpp"
      ],
      "libraries": [
      ],

      "include_dirs": [
        "inc",
        "../inc",
        "../Models/inc",
         "../Utils/inc",
         "../GameElements/inc",
         "../Actions/inc"
      ],

      "cflags": [ "-std=c++11", "-pthread" ]
    }
  ],
}