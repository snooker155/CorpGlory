//
// Created by ees on 11/3/15.
//

#include "GameWrapper.hpp"
#include "Player.hpp"

#include <node.h>

#include <algorithm>

using v8::HandleScope;

v8::Persistent<v8::Function> GameWrapper::constructor;

GameWrapper::~GameWrapper()
{
}

GameWrapper::GameWrapper(const std::vector<Player>& players)
  : m_game(players)
{
}

void GameWrapper::init(v8::Handle<v8::Object> exports)
{
  v8::Local<v8::FunctionTemplate> constructorTemplate = v8::FunctionTemplate::New(New);
  constructorTemplate->SetClassName(v8::String::NewSymbol("Game"));
  constructorTemplate->InstanceTemplate()->SetInternalFieldCount(1);

  constructorTemplate->PrototypeTemplate()->Set(v8::String::NewSymbol("gameState"),
                                                v8::FunctionTemplate::New(gameState)->GetFunction());

  constructor = v8::Persistent<v8::Function>::New(constructorTemplate->GetFunction());
  exports->Set(v8::String::NewSymbol("NewGame"), constructor);

}

v8::Handle<v8::Value> GameWrapper::New(const v8::Arguments& args)
{
  HandleScope scope;

  if (args.IsConstructCall())
  {
    auto idsArray = v8::Local<v8::Array>::Cast(args[0]);

    std::vector<Player> players;
    auto playersCount = idsArray->Length();
    for (size_t i = 0; i < playersCount; ++i) {
      auto player = idsArray->Get(v8::Integer::New(i))->ToObject();
      players.push_back(createPlayer(player));
    }

    GameWrapper* wrapper = new GameWrapper(players);
    wrapper->Wrap(args.This());
    return args.This();
  }
  else
  {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = { args[0] };
    return scope.Close(constructor->NewInstance(argc, argv));
  }
}

v8::Handle<v8::Value> GameWrapper::gameState(const v8::Arguments& args)
{
  HandleScope scope;
  GameWrapper* wrapper = node::ObjectWrap::Unwrap<GameWrapper>(args.This());
  int state = wrapper->m_game.state();

  return scope.Close(v8::Number::New(state));
}

Player GameWrapper::createPlayer(v8::Handle<v8::Object> object)
{
  // TODO REMOVE HACKS
  auto jsname = object->Get(v8::String::New("name"))->ToString();
  std::vector<char> nameBuffer(jsname->Length());
  jsname->WriteAscii(&nameBuffer.front(), 0, jsname->Length());

  auto name = std::string(nameBuffer.begin(), nameBuffer.end());
  return Player(name);
}
