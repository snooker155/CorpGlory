{
  "targets": [
    {
      "target_name": "GameWrapper",
      "sources": [ "src/GameWrapper.cpp", "src/GameModule.cpp",  "../src/Game.cpp", "../src/Player.cpp"],
      "libraries": [
      ],

      "include_dirs": [
        "inc", "../inc"
      ],

      "cflags": [ "-std=c++11" ]
    }
  ],
}