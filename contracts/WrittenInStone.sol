//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WrittenInStone {
    string public name;
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
      uint id;
      string content;
      address owner;
    }
    /* lookups for posts by id */
    mapping(uint => Post) private idToPost;

    /* Deploy the contract with a name */
    /* set the creator as the owner of the contract */
    constructor(string memory _name) {
        console.log("Deploying WrittenInStone with name:", _name);
        name = _name;
        owner = msg.sender;
    }

    /* creates a new post */
    function createPost(string memory content) public {
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.content = content;
        post.owner = msg.sender;
    }

    /* fetch an individual post by id */
    function fetchPost(uint id) public view returns(Post memory){
      return idToPost[id];
    }

    /* fetch all posts */
    function fetchPosts() public view returns (Post[] memory) {
        uint itemCount = _postIds.current();

        Post[] memory posts = new Post[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Post storage currentItem = idToPost[currentId];
            posts[i] = currentItem;
        }
        return posts;
    }

    /* fetch a user's posts */
    function fetchMyPosts() public view returns (Post[] memory) {
      uint totalItemCount = _postIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      /* calculate total of a user's posts */
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToPost[i+1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      /* fetch a user's posts */
      Post[] memory posts = new Post[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToPost[i+1].owner == msg.sender) {
          uint currentId = i + 1;
          Post storage currentItem = idToPost[currentId];
          posts[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return posts;
    }

}