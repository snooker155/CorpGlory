//
// Created by ees on 11/3/15.
//

#include <node.h>
#include "GameWrapper.hpp"

using v8::HandleScope;

v8::Persistent<v8::Function> GameWrapper::constructor;

GameWrapper::~GameWrapper()
{
}

GameWrapper::GameWrapper()
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
    GameWrapper* wrapper = new GameWrapper();
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
  int state = wrapper->game.state();

  return scope.Close(v8::Number::New(state));
}
