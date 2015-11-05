//
// Created by ees on 11/3/15.
//

#ifndef CORPGLORYGAME_GAMEWRAPPER_HPP
#define CORPGLORYGAME_GAMEWRAPPER_HPP

#include "Game.hpp"

#include <node.h>
#include <v8.h>

class GameWrapper : public node::ObjectWrap
{
public:
  static void init(v8::Handle<v8::Object> exports);
private:
  explicit GameWrapper(const std::vector<Player>& players);
  ~GameWrapper();
  Game m_game;

  static v8::Handle<v8::Value> New(const v8::Arguments& args);
  static v8::Handle<v8::Value> createGame(const v8::Arguments& args);
  static v8::Persistent<v8::Function> constructor;
  static v8::Handle<v8::Value> gameState(const v8::Arguments& args);
  static Player createPlayer(v8::Handle<v8::Object> object);
};

#endif //CORPGLORYGAME_GAMEWRAPPER_HPP
