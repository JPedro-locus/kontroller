// src/pages/KPIs.jsx
import React, { useState, useMemo } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';
import TitleBar from '../components/Subtitle';
import FiltersBar from '../components/FiltersBar';
import PeriodPicker from '../components/PeriodPicker';
import DataTable from '../components/DataTable';
import ComparisonTable from '../components/ComparasionTable';

export default function KPIs() {
  const navigate = useNavigate();

  // ─── filtros de topo ───────────────────────────────────────────
  const [historia, setHistoria]     = useState('Histórico');
  const [period,    setPeriod]      = useState('');
  const [year,      setYear]        = useState('');
  const [kpi,       setKpi]         = useState('');
  const [view,      setView]        = useState('realOrcado');
  const [scenario,  setScenario]    = useState('');
  const [baseBudget,setBaseBudget]  = useState('');

  // ─── indicadores ────────────────────────────────────────────────
  const metricNames = [
    'MRR','ARR','Churn Rate','CAC','LTV',
    'Net Revenue','Gross Margin','Active Users',
    'New Customers','Support Tickets',
  ];

  // meses / viewLabels / linhas da tabela principal
  const months     = ['Jan-22','Fev-22','Mar-22','Abr-22','Mai-22','Jun-22','Jul-22','Ago-22','Set-22','Out-22','Nov-22','Dez-22'];
  const viewLabels = months.map((_,i) => i % 2 === 0 ? 'Real' : 'Forecast');
  const rows       = metricNames.map((label,ri) => ({
    label,
    unit: "R$'000'",
    values: months.map((_,mi) => (ri+1)*1000 + mi*120),
  }));

  // ─── comparação de períodos ──────────────────────────────────────
  const [periods, setPeriods] = useState([
    { label: 'Período 1', start: '', end: '' },
    { label: 'Período 2', start: '', end: '' },
  ]);

  const handleAddPeriod = () => {
    setPeriods(ps => [
      ...ps,
      {
        label: `Período ${ps.length + 1}`,
        start: '',
        end: '',
      }
    ]);
  };

  const handlePeriodConfirm = idx => ({ start, end }) => {
    setPeriods(p => {
      const copy = [...p];
      copy[idx] = { ...copy[idx], start, end };
      return copy;
    });
  };
  const handlePeriodCancel = idx => {
    setPeriods(p => {
      const copy = [...p];
      copy[idx] = { ...copy[idx], start: '', end: '' };
      return copy;
    });
  };

  // ─── comparação de períodos ────────────────────────────────────────
  const compMonths     = ['Jan-22','Jan-22','Fev-22','Fev-22','Mar-22','Mar-22'];
  const compViewLabels = compMonths.map((_,i) => i % 2 === 0 ? 'Real' : 'Forecast');
  const compRowsRaw    = metricNames.map((label,ri) => ({
    label,
    unit: "R$'000'",
    // valores flat [real1,fcst1, real2,fcst2, real3,fcst3]
    valuesFlat: compMonths.map((m,mi) => {
      const base = (ri+1)*1000 + months.indexOf(m)*120;
      return mi % 2 === 0 ? base : Math.round(base * 1.1);
    }),
  }));

  // 2) derivo um array de períodos de 2 em 2 meses
  const monthsByPeriod = useMemo(() => {
    const periods = [];
    for (let i = 0; i < compMonths.length; i += 2) {
      periods.push([compMonths[i], compMonths[i+1]]);
    }
    return periods;
  }, [compMonths]);

  // 3) reformato cada linha para o shape expected pelo ComparisonTable:
  //    values: [ [real1,fcst1], [real2,fcst2], [real3,fcst3] ]
  const compRows = useMemo(() => {
    return compRowsRaw.map(r => {
      const vals = [];
      for (let i = 0; i < r.valuesFlat.length; i += 2) {
        vals.push([ r.valuesFlat[i], r.valuesFlat[i+1] ]);
      }
      return {
        label: r.label,
        unit:  r.unit,
        values: vals,
      };
    });
  }, [compRowsRaw]);

  // ─── limpa todos filtros ─────────────────────────────────────────
  const clearAll = () => {
    setPeriod(''); setYear(''); setKpi(''); setScenario('');
  };

  return (
    <Box sx={{ display:'flex', height:'100%', width:'100%' }}>
      <Sidebar selectedItem="KPIs" onSelect={() => {}} />

      <Box sx={{ flexGrow:1, overflow:'auto' }}>
        <Container maxWidth={false} disableGutters>

          {/* cabeçalho */}
          <TitleBar
            title="KPIs"
            showHistoryToggle
            historyValue={historia}
            onHistoryChange={(_,v)=>v&&setHistoria(v)}

            showSelect
            selectLabel="Orçamento base"
            selectOptions={[
              { value:'jan', label:'Jan' },
              { value:'fev', label:'Fev' },
              { value:'mar', label:'Mar' },
            ]}
            selectValue={baseBudget}
            onSelectChange={e=>setBaseBudget(e.target.value)}

            showCreateButton
            createButtonText="Criar KPI"
            onCreate={()=>navigate('/kpis/novo')}

            showDownloadButton
            downloadButtonText="Download"
            onDownload={()=>{}}
          />

          {/* filtros */}
          <Box mb={4}>
            <FiltersBar
              periodOptions={[
                {value:'ultimos30', label:'Últimos 30 dias'},
                {value:'mesAtual',  label:'Mês atual'},
              ]}
              periodValue={period}
              onPeriodChange={e=>setPeriod(e.target.value)}
              onPeriodClear={()=>setPeriod('')}

              yearOptions={[2025,2024,2023,2022]}
              yearValue={year}
              onYearChange={e=>setYear(e.target.value)}
              onYearClear={()=>setYear('')}

              kpiOptions={metricNames}
              kpiValue={kpi}
              onKpiChange={e=>setKpi(e.target.value)}
              onKpiClear={()=>setKpi('')}

              scenarioOptions={['Base','Otimista','Pessimista']}
              scenarioValue={scenario}
              onScenarioChange={e=>setScenario(e.target.value)}
              onScenarioClear={()=>setScenario('')}

              viewOptions={[
                {value:'realOrcado', label:'Real X Orçado'},
                {value:'forecast',    label:'Forecast'},
                {value:'favoritos',   label:'Favoritos'},
              ]}
              viewValue={view}
              onViewChange={(_,v)=>v&&setView(v)}

              onClearAll={clearAll}
            />
          </Box>

          {/* tabela principal */}
          <DataTable rows={rows} months={months} viewLabels={viewLabels} />

          {/* comparar períodos */}
          <Typography variant="h6" gutterBottom>
            Comparar períodos
          </Typography>
          <Grid container spacing={2} mb={4}>
            {periods.map((p,i)=>(
              <Grid item xs={12} md={4} key={p.label}>
                <PeriodPicker
                  label={p.label}
                  onConfirm={handlePeriodConfirm(i)}
                  onCancel={()=>handlePeriodCancel(i)}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={4}>
              <Paper
                onClick={handleAddPeriod}              // ← aqui
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px dashed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 160,
                  minWidth: 280,
                  cursor: 'pointer',                   // deixa parecer clicável
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                + Adicionar período
              </Paper>
            </Grid>
          </Grid>

          {/* tabela de comparação Jan–Mar */}
          <Typography variant="h6" gutterBottom>
            Comparação Jan-22 a Mar-22
          </Typography>
          <ComparisonTable
             rows={compRows}
             monthsByPeriod={monthsByPeriod}
           />

        </Container>
      </Box>
    </Box>
  );
}
