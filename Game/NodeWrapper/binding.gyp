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
        "../Models/src/TeamModel.cpp",
        "../Actions/src/Action.cpp",
        "../Actions/src/TeamActions.cpp",
        "../Utils/src/Random.cpp",
        "../GameElements/src/GameElement.cpp",
        "../GameElements/inc/GameElement.hpp",
        "../GameElements/src/Team.cpp"
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

      "cflags": [ "-std=c++11", "-pthread" ],
      "cflags_cc!": [ "-fno-rtti", "-fno-exceptions" ]
    }
  ],
}