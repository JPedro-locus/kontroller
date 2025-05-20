import { Box, Divider } from '@mui/material';
import PeriodFilter from './PeriodFilter';
import YearFilter   from './YearFilter';
import KpiFilter    from './KpiFilter';
import ScenarioFilter from './ScenarioFilter'; // similar aos outros
import ViewPills    from './ViewPills';        // seu ToggleButtonGroup existente

export default function FiltersBar(props) {
  const {
    periodOptions, periodValue, onPeriodChange, onPeriodClear,
    yearOptions,   yearValue,   onYearChange,   onYearClear,
    kpiOptions,    kpiValue,    onKpiChange,    onKpiClear,
    scenarioOptions, scenarioValue, onScenarioChange, onScenarioClear,
    viewOptions, viewValue, onViewChange,
    onClearAll,
  } = props;

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
      { (periodValue||yearValue||kpiValue||scenarioValue) && (
        <Button onClick={onClearAll} /* botão “Limpar tudo” */ />
      )}

      <Divider orientation="vertical" flexItem />

      {/* cada filtro fica no seu lugar */}
      <PeriodFilter
        options={periodOptions}
        value={periodValue}
        onChange={onPeriodChange}
        onClear={onPeriodClear}
      />

      <YearFilter
        options={yearOptions}
        value={yearValue}
        onChange={onYearChange}
        onClear={onYearClear}
      />

      <Divider orientation="vertical" flexItem />

      <KpiFilter
        options={kpiOptions}
        value={kpiValue}
        onChange={onKpiChange}
        onClear={onKpiClear}
      />

      <Divider orientation="vertical" flexItem />

      <ViewPills
        options={viewOptions}
        value={viewValue}
        onChange={onViewChange}
      />

      <Divider orientation="vertical" flexItem />

      <ScenarioFilter
        options={scenarioOptions}
        value={scenarioValue}
        onChange={onScenarioChange}
        onClear={onScenarioClear}
      />
    </Box>
  );
}
