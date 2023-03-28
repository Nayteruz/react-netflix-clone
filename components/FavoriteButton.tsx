import axios from "axios";
import React, {useCallback, useMemo, useState} from "react";
import {AiOutlinePlus, AiOutlineCheck} from "react-icons/ai"

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {

    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();
    const [isLoading, setIsLoading] = useState(false);

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        setIsLoading(true);
        let response;
        if (isFavorite) {
            response = await axios.delete('/api/favorite', {data: {movieId}})
        } else {
            response = await axios.post('/api/favorite', {movieId})
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds,
        });

        mutateFavorites();
        setIsLoading(false);
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites, isLoading])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div
            onClick={toggleFavorites}
            className="
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            items-center
            justify-center
            transition
            hover:border-neutral-300
            relative
        ">
            {isLoading && <span
              className="
              absolute
              w-2/3
              h-2/3
              rounded-full
              border-4
              border-green-600
              border-b-green-200
              animate-spin
              "></span>}
            {!isLoading && <Icon className="text-white" size={25}/>}
        </div>
    )
}

export default FavoriteButton;