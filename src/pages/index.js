import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import RecipeItem from '../components/RecipeItem';
import styled from 'styled-components';

const LinkButton = styled.div`
  text-align: right;
  a{
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover{
      background: indigo;
    }
  }
`

const IndexPage = (props) => {
  console.log(props);
  return (
    <>
      <SEO title="Home" />
      {props.data.allRecipe.edges.map(edge => (
        <RecipeItem
          recipeCover={edge.node.localImage.childImageSharp.fixed}
          cookName={edge.node.cook.name}
          recipeSummary={edge.node.summary}
          recipeName={edge.node.name}
          recipeLink={edge.node.link}
          key={edge.node.id}>
          <LinkButton>
            <Link to={`/recipe/${edge.node.id}`}>
                Join conversation
            </Link>
          </LinkButton>
        </RecipeItem>
      ))}
    </>
  )
}

export const query = graphql`
  {
    allRecipe {
      edges {
        node {
          id
          name
          summary
          link
            localImage {
            childImageSharp{
              fixed(width:200){
                ...GatsbyImageSharpFixed
              }
            }
          }
          cook {
            id
            name
          }
        }
      }
    }
  }
`;

export default IndexPage
