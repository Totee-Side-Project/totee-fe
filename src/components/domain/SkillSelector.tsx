// skill

import { SelectItem } from '@components/atoms';
import { Circle } from '@components/ui/circle/Circle';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';

const skills = {
  frontEnd: ['JavaScript', 'TypeScript', 'Next.js', 'Svelte', 'React'],
  backEnd: ['asd', 'a', 'b'],
  mobile: ['a', 'd', 'd'],
  etc: ['e', 't', 'c'],
} as {
  [key: string]: string[];
};

const skiilsWithKR = {
  프론트엔드: 'frontEnd',
  백엔드: 'backEnd',
  모바일: 'mobile',
  기타: 'etc',
} as {
  [key: string]: string;
};
const categories = ['프론트엔드', '백엔드', '모바일', '기타'];

// selectedFilter에 따라 Selector에 렌더링할 data 를 넘겨주는 역할

export const SkillSelector = () => {
  const [selectedFilter, setSelectedFilter] = useState(categories[0]);
  const [filteredSkills, setFilteredSkills] = useState<string[]>(
    skills[skiilsWithKR[selectedFilter]],
  );
  const [selectedSkills, setSelectedSkills] = useState<(undefined | string)[]>(
    [],
  );
  const [selectedSkiilsTypeObject, setSelectedSkiilsTypeObject] = useState<{
    [key: string]: boolean;
  }>({});

  const onClickWithFilterItem = (
    e: MouseEvent<HTMLUListElement | HTMLLIElement>,
  ) => {
    if (e.currentTarget === e.target) return;
    const target = e.target as HTMLLIElement;
    setSelectedFilter(target.innerText);
  };

  const onClickWithSkillItem = (
    e: MouseEvent<HTMLUListElement | HTMLLIElement>,
  ) => {
    const currentTaget = e.currentTarget;
    const dataValue = currentTaget.getAttribute('data-value');
    if (!dataValue) return;

    setSelectedSkiilsTypeObject((state) => ({
      ...state,
      ...{ [dataValue]: !state[dataValue] },
    }));
  };

  useEffect(() => {
    const keys = skills[skiilsWithKR[selectedFilter]];
    setFilteredSkills(keys);

    const newState = {} as { [key: string]: boolean };
    keys.forEach((key) => (newState[key] = false));
    setSelectedSkiilsTypeObject(() => newState);
  }, [selectedFilter]);

  useEffect(() => {
    const newState = Object.entries(selectedSkiilsTypeObject).map(
      ([key, value]) => {
        if (value) return key;
      },
    );

    setSelectedSkills(newState);
  }, [selectedSkiilsTypeObject]);

  return (
    <>
      <div>모집언어</div>
      <Categories
        selectedFilter={selectedFilter}
        onClick={onClickWithFilterItem}
      />
      <Selector
        filteredSkills={filteredSkills}
        selectedSkiilsTypeObject={selectedSkiilsTypeObject}
        onClick={onClickWithSkillItem}
      />
    </>
  );
};

interface CategoriesProps {
  selectedFilter: string | undefined;
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const Categories = ({ selectedFilter, onClick }: CategoriesProps) => {
  return (
    <span>
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        onClick={onClick}
      >
        {categories.map((category, index) => (
          <SelectItem
            key={category + index}
            style={{ cursor: 'pointer' }}
            bottom={<div style={{ borderBottom: '1px solid green' }}></div>}
          >
            {category}
          </SelectItem>
        ))}
      </ul>
    </span>
  );
};

interface SelectorProps {
  filteredSkills: string[];
  selectedSkiilsTypeObject: { [key: string]: boolean };
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const Selector = ({
  filteredSkills,
  selectedSkiilsTypeObject,
  onClick,
}: SelectorProps) => {
  // filteredSkills
  return (
    <div>
      <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
        {filteredSkills.map((skill, index) => (
          <SkillItem
            key={skill + index}
            dataValue={skill}
            isSelect={selectedSkiilsTypeObject[skill]}
            onClick={onClick}
          >
            {skill}
          </SkillItem>
        ))}
      </ul>
    </div>
  );
};

interface SkillItemProps {
  children: ReactNode;
  dataValue: string;
  isSelect: boolean;
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const SkillItem = ({
  children,
  dataValue,
  isSelect,
  onClick,
}: SkillItemProps) => {
  return (
    <li
      className={isSelect ? 'select' : ''}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      data-value={dataValue}
    >
      <SelectItem
        left={<Circle selected={isSelect}></Circle>}
        style={{ display: 'flex' }}
      >
        <div className="asdsad">{children}</div>
      </SelectItem>
    </li>
  );
};
