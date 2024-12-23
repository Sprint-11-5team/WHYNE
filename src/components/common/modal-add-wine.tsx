"use client";

import { useState } from "react";
import { NewWineData, WineType } from "@/types/tasting";
import Button from "@/components/common/Button";
import Input from "@/components/common/input";
import ImageInput from "@/components/common/image-input";
import WineTypeDropdown from "@/components/common/wine-type-drop-down";

interface Props {
  onClose: () => void;
}

export default function AddWine({ onClose }: Props) {
  const [values, setValues] = useState<NewWineData>({
    name: "",
    region: "",
    image: "",
    price: 0,
    type: WineType.None,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (
    id: string,
    value: string | number | WineType | null,
  ): string => {
    if (value === null) return "값을 입력해주세요.";

    switch (id) {
      case "name":
        return !value || (typeof value === "string" && value.trim() === "")
          ? "와인 이름을 입력해주세요."
          : "";

      case "price":
        if (!value || Number(value) === 0) return "가격을 입력해주세요.";
        return Number(value) < 0 || Number(value) > 1000000
          ? "유효한 가격 범위는 0~1,000,000원입니다."
          : "";

      case "region":
        return !value || (typeof value === "string" && value.trim() === "")
          ? "원산지를 입력해주세요."
          : "";

      case "type":
        return value === WineType.None ? "와인 타입을 선택해주세요." : "";

      case "image":
        return !imageFile ? "이미지를 선택해주세요." : "";

      default:
        return "";
    }
  };

  const shouldShowError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName];
  };

  const handleBlur = (id: string) => {
    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    if (id === "name" || id === "region" || id === "price" || id === "image") {
      const errorMessage = validateField(id, values[id]);
      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [id]: errorMessage }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[id];
          return newErrors;
        });
      }
    }
  };

  const handleChangeImage = (image: File | null) => {
    if (image) {
      setImageFile(image);
      setTouched((prev) => ({ ...prev, image: true }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    } else {
      setImageFile(null);
      setErrors((prev) => ({ ...prev, image: "이미지를 선택해주세요." }));
    }
  };

  const updateFieldValue = (id: string, value: string | number | WineType) => {
    const newValues = {
      ...values,
      [id]: value,
    };
    setValues(newValues);

    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const errorMessage = validateField(id, value);
    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [id]: errorMessage }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleWineValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateFieldValue(id, id === "price" ? Number(value) : value);
  };

  const handleTypeChange = (value: WineType) => {
    updateFieldValue("type", value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allFields = ["name", "price", "region", "type", "image"];
    const allTouched = allFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: true,
      }),
      {},
    );
    setTouched(allTouched);

    // 모든 필드 유효성 검사
    const newErrors: Record<string, string> = {};
    allFields.forEach((field) => {
      const value = values[field as keyof NewWineData];
      const errorMessage = validateField(field, value);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        if (!imageFile) {
          throw new Error("이미지 파일이 등록되지 않았습니다");
        }
        onClose();
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setErrors((prev) => ({
          ...prev,
          image: "이미지 업로드에 실패했습니다.",
        }));
      }
    }
  };

  const isSubmitDisabled =
    !values.name ||
    !values.region ||
    values.price === 0 ||
    values.type === WineType.None ||
    !imageFile ||
    Object.keys(errors).length > 0;

  return (
    <div className="flex flex-col h-full">
      <article className="flex-1 px-[2.4rem]">
        <h1 className="text-xl tablet:text-2xl font-bold mt-[2.4rem] mb-[2.4rem] tablet:mb-[3.2rem]">
          와인 등록
        </h1>

        <form className="flex flex-col h-full" onSubmit={handleSubmit}>
          <div className="flex-1 flex flex-col gap-[2rem] tablet:gap-[2.4rem]">
            <div className="flex flex-col gap-[0.8rem] tablet:gap-[1rem]">
              <label
                htmlFor="name"
                className="text-base tablet:text-lg font-medium"
              >
                와인 이름
              </label>
              <Input
                id="name"
                placeholder="와인 이름 입력"
                onChange={handleWineValueChange}
                onBlur={() => handleBlur("name")}
                value={values.name}
                error={shouldShowError("name") ? errors.name : ""}
              />
            </div>

            <div className="flex flex-col gap-[0.8rem] tablet:gap-[1rem]">
              <label
                htmlFor="price"
                className="text-base tablet:text-lg font-medium"
              >
                가격
              </label>
              <Input
                id="price"
                placeholder="가격 입력"
                type="number"
                min="0"
                onChange={handleWineValueChange}
                onBlur={() => handleBlur("price")}
                value={values.price === 0 ? "" : String(values.price)}
                error={shouldShowError("price") ? errors.price : ""}
              />
            </div>

            <div className="flex flex-col gap-[0.8rem] tablet:gap-[1rem]">
              <label
                htmlFor="region"
                className="text-base tablet:text-lg font-medium"
              >
                원산지
              </label>
              <Input
                id="region"
                placeholder="원산지 입력"
                onChange={handleWineValueChange}
                onBlur={() => handleBlur("region")}
                value={values.region}
                error={shouldShowError("region") ? errors.region : ""}
              />
            </div>

            <div className="flex flex-col gap-[0.8rem] tablet:gap-[1rem]">
              <label
                htmlFor="type"
                className="text-base tablet:text-lg font-medium"
              >
                타입
              </label>
              <WineTypeDropdown
                value={values.type}
                onChange={handleTypeChange}
                onBlur={() => handleBlur("type")}
                error={shouldShowError("type") ? errors.type : ""}
              />
            </div>

            <div className="flex flex-col gap-[0.8rem] tablet:gap-[1rem]">
              <label
                htmlFor="image"
                className="text-base tablet:text-lg font-medium"
              >
                이미지
              </label>
              <ImageInput
                id="image"
                onChangeImage={handleChangeImage}
                hasPreview
                error={shouldShowError("image") ? errors.image : ""}
              />
            </div>
          </div>

          <div className="flex gap-[1rem] mt-[2rem] tablet:mt-[2.4rem] sticky bottom-0 bg-white py-[1.6rem]">
            <Button
              size="small"
              color="white"
              type="button"
              onClick={onClose}
              addClassName="flex-1 text-primary font-bold min-h-[4rem] text-base tablet:text-lg"
            >
              취소
            </Button>
            <Button
              size="small"
              color="primary"
              type="submit"
              disabled={isSubmitDisabled}
              addClassName="flex-[2.4] font-bold min-h-[4rem] text-base tablet:text-lg"
            >
              와인 등록하기
            </Button>
          </div>
        </form>
      </article>
    </div>
  );
}
