// skill

import { SelectItem } from '@components/atoms';
import { Circle } from '@components/ui/circle/Circle';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import icon from '@components/common/svg';
import classes from './skillSelector.module.scss';

const skills = {
  frontEnd: ['JavaScript', 'Nextjs', 'React', 'Svelte', 'typescript'],
  backEnd: [
    'Django',
    'Express',
    'Firebase',
    'Go',
    'GraphQL',
    'JAVA',
    'Kotlin',
    'MongoDB',
    'MySQL',
    'Nestjs',
    'Nodejs',
    'php',
    'Python',
    'Spring',
  ],
  mobile: ['Flutter', 'Kotlin', 'ReactNative', 'Swift', 'Unity'],
  etc: ['AWS', 'C', 'Docker', 'Figma', 'Git', 'Jest', 'Kubernetes', 'Zeplin'],
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
// selectedSkills가 변경될 때 마다 상위 Component의 상태를 변경해주는 useEffect를 사용하면 어떨까?

interface Props {
  onChangeArray: (data: (undefined | string)[]) => void;
  top?: ReactNode;
}

export const SkillSelector = ({ onChangeArray, top }: Props) => {
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

  const onClickFilterItem = (
    e: MouseEvent<HTMLUListElement | HTMLLIElement>,
  ) => {
    if (e.currentTarget === e.target) return;
    const target = e.target as HTMLLIElement;
    setSelectedFilter(target.innerText);
  };

  const onClickSkillItem = (
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
    onChangeArray(selectedSkills);
  }, [selectedSkills]);

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
    <div className={classes.skill_selector_container}>
      {top}
      <Categories selectedFilter={selectedFilter} onClick={onClickFilterItem} />
      <div className={classes.selector_background}>
        <Selector
          filteredSkills={filteredSkills}
          selectedSkiilsTypeObject={selectedSkiilsTypeObject}
          onClick={onClickSkillItem}
        />
      </div>
    </div>
  );
};

interface CategoriesProps {
  selectedFilter: string | undefined;
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const Categories = ({ selectedFilter, onClick }: CategoriesProps) => {
  return (
    <ul className={classes.category_wrap} onClick={onClick}>
      {categories.map((category, index) => (
        <li
          className={
            category === selectedFilter
              ? classes.category_item + ' ' + classes.select
              : classes.category_item
          }
          key={category + index}
        >
          {category}
        </li>
      ))}
    </ul>
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
  return (
    <ul className={classes.select_item_wrap}>
      {filteredSkills.map((skill, index) => (
        <SkillItem
          key={skill + index}
          dataValue={skill}
          isSelect={selectedSkiilsTypeObject[skill]}
          src={icon[skill]}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

interface SkillItemProps {
  // children: ReactNode;
  dataValue: string;
  isSelect: boolean;
  src: string;
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const SkillItem = ({ dataValue, isSelect, src, onClick }: SkillItemProps) => {
  return (
    <li
      className={isSelect ? 'select' : ''}
      style={{ flex: '0 0 25%' }}
      onClick={onClick}
      data-value={dataValue}
    >
      <SelectItem
        left={<Circle selected={isSelect} backgroundColor="#7BA364" />}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div className="">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                objectPosition: '0px 5px',
              }}
              src={src}
            />
            <div>{dataValue}</div>
          </div>
        </div>
      </SelectItem>
    </li>
  );
};
