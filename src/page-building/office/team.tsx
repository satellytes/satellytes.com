import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { Image } from '../../new-components/image/image';
import { SectionHeader } from '../../new-components/section-header/section-header';
import ImageDaniel from './../../../static/team/daniel.png';
import ImageEric from './../../../static/team/eric.png';
import ImageFabian from './../../../static/team/fabian.png';
import ImageFelix from './../../../static/team/felix.png';
import ImageFlo from './../../../static/team/flo.png';
import ImageGholam from './../../../static/team/gholam.png';
import ImageJesus from './../../../static/team/jesus.png';
import ImageJonathan from './../../../static/team/jonathan.jpg';
import ImageMark from './../../../static/team/mark.png';
import ImagePavel from './../../../static/team/pavel.png';

const TEAM = [
  { fileName: ImageEric, name: 'Eric Singhartinger' },
  { fileName: ImageGholam, name: 'Gholam Abdol' },
  { fileName: ImageJesus, name: 'Jesùs Real Serrano' },
  { fileName: ImageFlo, name: 'Florian Geier' },
  { fileName: ImagePavel, name: 'Pavel Katkov' },
  { fileName: ImageFabian, name: 'Fabian Dietenberger' },
  { fileName: ImageMark, name: 'Mark Altmann' },
  { fileName: ImageDaniel, name: 'Daniel Eißing' },
  { fileName: ImageFelix, name: 'Felix Hofmann' },
  { fileName: ImageJonathan, name: 'Jonathan Ostertag' },
];

const ImageWrapper = styled.img`
  width: 160px;
  height: 160px;

  ${up('sm')} {
    width: 186px;
    height: 186px;
  }
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 8px;

  ${up('sm')} {
    gap: 40px 24px;
  }

  margin-top: 80px;
`;

export const Team = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeader
        headline={t('office.team.heading')}
        kicker={t('office.team.title')}
      >
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum. Etiam porta sem malesuada magna mollis euismod. Fusce
        dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
        fermentum massa justo sit amet risus. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac
        facilisis in, egestas eget quam. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur
        ac, vestibulum at eros. Donec sed odio dui. Integer posuere erat a ante
        venenatis dapibus posuere velit aliquet. Aenean eu leo quam.
        Pellentesque ornare sem lacinia quam venenatis vestibulum.
      </SectionHeader>

      <TeamWrapper>
        {TEAM.map((member) => {
          return (
            <Image
              description={member.name}
              textAlign="bottom"
              key={member.fileName}
            >
              <ImageWrapper
                src={member.fileName}
                style={{
                  objectFit: 'cover',
                }}
              />
            </Image>
          );
        })}
      </TeamWrapper>
    </div>
  );
};
