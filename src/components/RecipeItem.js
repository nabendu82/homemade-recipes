import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const RecipeItemWrapper = styled.section`
    border: 1px solid #ddd;
    padding: 8px;
    background: white;
    margin-bottom: 8px;
    display: flex;

    h2{
        small{
        font-size: 14px;
        padding-left: 8px;
        font-weight: normal;
        }
    }
`;

const RecipeItemContentWrapper = styled.div`
    flex-grow: 1;
    padding-left: 8px;
`;

const RecipeItemImageWrapper = styled.div`
    max-width: 200px;

    img{
        max-width: 200px;
    }
`;

const YoutubeButton = styled.div`
    text-align: left;
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

const RecipeItem = ({ cookName, recipeSummary, recipeName, recipeLink, recipeCover, children }) => {
    return (
        <RecipeItemWrapper>
            <RecipeItemImageWrapper>
                <Img fixed={recipeCover} />
            </RecipeItemImageWrapper>
            <RecipeItemContentWrapper>
                <h2>
                    {recipeName}<small>{cookName}</small>
                </h2>
                <p>
                    {recipeSummary}
                </p>
                <YoutubeButton>
                    <a href={recipeLink} target="_blank" rel="noopener noreferrer">Youtube</a>
                </YoutubeButton>
                <div>
                    {children}
                </div>
            </RecipeItemContentWrapper>
        </RecipeItemWrapper>
    )
}

export default RecipeItem
