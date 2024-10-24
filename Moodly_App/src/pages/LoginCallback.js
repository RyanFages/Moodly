import axios from "axios";
import { useDispatch } from "react-redux";

const getRole = async ({ jwt }) => {
    try {
        const response = await axios.get(
            "http://10.134.197.209:1337/api/users/me?populate=*",
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        const role = response.data.role.name;
        return role;
    } catch (error) {
        console.log("An error occurred:", error.response);
        return null;
    }
};

const LoginCallback = async ({ jwt, user }) => {
    const dispatch = useDispatch();

    const role = await getRole({ jwt });

    // Mettre à jour le store Redux avec les informations de l'utilisateur
    dispatch(setUser({ user, jwt, role }));

    if (role === "manager") {
        navigation.navigate("ManagerDashboard");
    } else {
        try {
            const response = await axios.get(
                "http://10.134.197.209:1337/api/",
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        userID: user.id,
                    },
                }
            );
            const emotion = response.data;
            navigation.navigate("EmotionPage", { emotion });
        } catch (error) {
            console.log("An error occurred:", error.response);
        }
    }
};

export default LoginCallback;
