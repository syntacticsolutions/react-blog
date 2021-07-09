import React from "react";
import renderer from "react-test-renderer";
import { PostMasonry } from "../";
import featured from "../../../assets/mocks/featured";

const mergeStyles = function (posts, config) {
  posts.forEach((post, index) => {
    post.style = config[index];
    post.author = "Miguel Coder";
    post.description =
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.";
  });
};

const featuredConfig = {
  0: {
    gridArea: "1 / 1 / 2 / 3",
    height: "300px",
  },
  1: {
    height: "300px",
  },
  3: {
    height: "630px",
    marginLeft: "30px",
    width: "630px",
  },
};

mergeStyles(featured, featuredConfig);

describe("<PostMasonry> Component", () => {
  it("Should render properly", () => {
    const tree = renderer
      .create(<PostMasonry posts={featured} columns={2} tagsOnTop={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
