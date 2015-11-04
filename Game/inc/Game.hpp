//
// Created by ees on 11/3/15.
//

#ifndef CORPGLORYGAME_GAME_HPP
#define CORPGLORYGAME_GAME_HPP

#include <memory>

class Game {
public:
    Game();
    ~Game();
    void hello();
    int state();
private:
    struct GameImpl;
    std::shared_ptr<GameImpl> m_impl;
};


#endif //CORPGLORYGAME_GAME_HPP
