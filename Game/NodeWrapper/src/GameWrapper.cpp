//
// Created by ees on 11/3/15.
//

#include "GameWrapper.hpp"
#include "Player.hpp"

#include <node.h>

#include <algorithm>
#include <memory>

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

  constructorTemplate->PrototypeTemplate()->Set(v8::String::NewSymbol("processAction"),
                                                v8::FunctionTemplate::New(processAction)->GetFunction());


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
  std::string state = wrapper->m_game.state();

  return scope.Close(v8::String::New(state.c_str(), state.size()));
}

std::string fromV8String(v8::Handle<v8::String> string)
{
  std::vector<char> nameBuffer(string->Length());
  string->WriteAscii(&nameBuffer.front(), 0, string->Length());
  return std::string(nameBuffer.begin(), nameBuffer.end());
}

Player GameWrapper::createPlayer(v8::Handle<v8::Object> object)
{
  // TODO REMOVE HACKS
  auto jsname = object->Get(v8::String::New("name"))->ToString();
  auto name = fromV8String(jsname);
  return Player(name);
}

v8::Handle<v8::Value> GameWrapper::processAction(const v8::Arguments& args)
{
  v8::HandleScope scope;

  if (args.Length() != 1)
  {
  }

  GameWrapper* wrapper = node::ObjectWrap::Unwrap<GameWrapper>(args.This());

  v8::Local<v8::Object> arg = args[0]->ToObject();
  v8::Local<v8::Array> keys = arg->GetOwnPropertyNames();

  std::cerr << "2" << std::endl;

  ActionParams params;
  for (uint32_t i = 0; i < keys->Length(); ++i)
  {
    auto key = keys->Get(i)->ToString();
    auto value = fromV8String(arg->Get(key)->ToString());
    params[fromV8String(key)] = value;
  }

  std::cerr << "3" << std::endl;

  if (!params.count("action"))
  {
    std::cerr << "'action' key has to be in Actions parameters" << std::endl;
    return v8::Undefined();
  }

  std::cerr << "4" << std::endl;

  for (auto it : params)
    std::cerr << it.first << " -> " << it.second << "; ";
  std::cerr << std::endl;

  auto action = createAction(params["action"], params);

  std::cerr << action << std::endl;
  std::cerr << "Processing action " << params["action"] << std::endl;
  std::cerr << "6" << std::endl;
  wrapper->m_game.processAction(action);
  std::cerr << "7" << std::endl;

  return v8::Undefined();
}
