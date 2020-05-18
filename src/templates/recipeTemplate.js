import React, { useContext } from 'react'
import RecipeItem from '../components/RecipeItem';
import {graphql} from 'gatsby';
import { RecipeComments } from '../components/common';
import { FirebaseContext } from '../components/Firebase';

const RecipeTemplate = (props) => {
    const {firebase} = useContext(FirebaseContext)

    return (
        <section>
            <RecipeItem
                recipeCover={props.data.recipe.localImage.childImageSharp.fixed}
                cookName={props.data.recipe.cook.name}
                recipeSummary={props.data.recipe.summary}
                recipeName={props.data.recipe.name}
                recipeLink={props.data.recipe.link}
            />
            {!!firebase && <RecipeComments firebase={firebase} recipeId={props.data.recipe.id} />}
        </section>
    )
}

export const query = graphql`
    query RecipeQuery($recipeId: String!) {
        recipe(id: {eq: $recipeId}){
        id
        summary
        name
        link
        localImage{
            childImageSharp{
                fixed(width: 200){
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
`;

export default RecipeTemplate
