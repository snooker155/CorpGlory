//
// Created by ees on 11/4/15.
//

#include <node.h>
#include <v8.h>

#include "GameWrapper.hpp"
#include <thread>
#include <fstream>
#include <iostream>

using namespace v8;
using v8::Local;
using v8::Object;

std::ofstream fcout("logs/cout.txt");
std::ofstream fcerr("logs/cerr.txt");


void init(Local<Object> target)
{
  std::cout.rdbuf(fcout.rdbuf());
  std::cerr.rdbuf(fcerr.rdbuf());
  GameWrapper::init(target);
}

NODE_MODULE(GameWrapper, init)