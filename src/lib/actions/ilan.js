import { endpoints, axiosAuth } from "../axios";

import { getAdvertImages } from "./images";

export const getCategories = async () => {
  try {
    const response = await axiosAuth.get(endpoints.ilan.categories);
    return response.data;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

export const getCategoryFeatures = async (categoryId) => {
  try {
    const response = await axiosAuth.get(
      endpoints.ilan.categoryFeatures.replace("{id}", categoryId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category features:", error);
    throw error;
  }
};

export const createAdvert = async (advertData) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.createAdvert, advertData);
    return response.data;
  } catch (error) {
    console.error("Error creating advert:", error);
    throw error;
  }
};

export const addAdvertFeatures = async (features) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.createAdFeature, features);
    return response.data;
  } catch (error) {
    console.error("Error creating ad features:", error);
    throw error;
  }
};

export const getAdverts = async (
  params = {
    page: 1,
    sortBy: "created_at",
    sortOrder: "DESC",
  }
) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.listAdverts, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching adverts:", error);
    throw error;
  }
};

export const getAllAdverts = async (
  params = {
    page: 1,
    sortBy: "created_at",
    sortOrder: "DESC",
  }
) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      ...(params.categoryId && { categoryId: params.categoryId }),
    }).toString();

    const response = await axiosAuth.get(`${endpoints.ilan.all}?${queryParams}`);

    const adverts = response.data;
    const advertsWithImages = await Promise.all(
      adverts.map(async (advert) => {
        try {
          const images = await getAdvertImages(advert.id);
          return {
            ...advert,
            images: images || [],
          };
        } catch (error) {
          console.error(`Error fetching images for advert ${advert.id}:`, error);
          return {
            ...advert,
            images: [],
          };
        }
      })
    );

    return {
      data: advertsWithImages,
    };
  } catch (error) {
    console.error("Error fetching all adverts:", error);
    throw error;
  }
};

export const addAdvertImage = async (imageData) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.addImages, imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      transformRequest: [(data) => data],
    });

    return response.data;
  } catch (error) {
    console.error("Resim Yükleme Hatası:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const getAdvertFeatures = async (advertId) => {
  try {
    const response = await axiosAuth.get(
      endpoints.ilan.getAdFeatures.replace("{advertId}", advertId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ad features:", error);
    throw error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axiosAuth.get(endpoints.users.userDetails.replace('{id}', userId));
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getAdvertDetails = async (advertId) => {
  try {
    const response = await axiosAuth.get(endpoints.ilan.getAdvertDetails.replace('{advertId}', advertId));
    const advert = response.data;
    
    if (advert.userId) {
      try {
        const userDetails = await getUserDetails(advert.userId);
        advert.user = userDetails;
      } catch (error) {
        console.error("Error fetching user details:", error);
        advert.user = null;
      }
    }
    
    return advert;
  } catch (error) {
    console.error("Error fetching advert details:", error);
    throw error;
  }
};