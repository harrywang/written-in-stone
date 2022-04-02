const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("WrittenInStone", async function () {
  it("Should create and fetch posts", async function () {
    const WrittenInStone = await ethers.getContractFactory("WrittenInStone")
    const wis = await WrittenInStone.deploy("weiwei")
    await wis.deployed()

    // create two msg.sender
    const [owner, addr1] = await ethers.getSigners();

    // create posts from different addresses
    await wis.connect(owner).createPost("owner post");
    await wis.connect(owner).createPost("owner post2");
    await wis.connect(owner).createPost("owner post3");

    await wis.connect(addr1).createPost("my post");
    await wis.connect(addr1).createPost("my post2");

    // test get all posts
    const all_posts = await wis.fetchPosts();
    console.log(all_posts)
    expect(all_posts[0].content).to.equal("owner post")

    // test get one post
    const one_post = await wis.fetchPost(3);
    expect(one_post.content).to.equal("owner post3")

    // test get my posts
    const posts = await wis.connect(owner).fetchMyPosts();
    expect(posts[0].content).to.equal("owner post")
    expect(posts[0].id).to.equal(1)

    const posts1 = await wis.connect(addr1).fetchMyPosts();
    expect(posts1[1].content).to.equal("my post2")
    expect(posts1[1].id).to.equal(5)
  })
})